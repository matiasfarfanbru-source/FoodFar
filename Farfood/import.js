// ===================================================================
// FarFood - Importador de Dieta con Gemini AI
// ===================================================================

const DietImporter = {
    files: [],  // { file, base64, type }
    parsedDiet: null,

    init() {
        this.setupToggle();
        this.setupDropzone();
        this.setupAnalyze();
        this.loadApiKey();
    },

    loadApiKey() {
        const saved = localStorage.getItem('farfood_gemini_key');
        if (saved) document.getElementById('gemini-api-key').value = saved;
    },

    saveApiKey(key) {
        localStorage.setItem('farfood_gemini_key', key);
    },

    // Toggle panel
    setupToggle() {
        document.getElementById('btn-open-import').addEventListener('click', () => {
            const panel = document.getElementById('import-panel');
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        document.getElementById('btn-close-import').addEventListener('click', () => {
            document.getElementById('import-panel').classList.add('hidden');
        });
    },

    // Dropzone
    setupDropzone() {
        const dz = document.getElementById('import-dropzone');
        const input = document.getElementById('import-file-input');

        dz.addEventListener('click', () => input.click());

        dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.classList.add('dragover'); });
        dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
        dz.addEventListener('drop', (e) => {
            e.preventDefault();
            dz.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });

        input.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
            input.value = '';
        });
    },

    async handleFiles(fileList) {
        for (const file of fileList) {
            if (file.type.startsWith('image/') || file.type === 'application/pdf') {
                const base64 = await this.fileToBase64(file);
                this.files.push({ file, base64, type: file.type });
            }
        }
        this.renderPreviews();
        this.updateAnalyzeBtn();
    },

    fileToBase64(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });
    },

    renderPreviews() {
        const container = document.getElementById('import-previews');
        container.innerHTML = '';
        this.files.forEach((f, idx) => {
            const div = document.createElement('div');
            div.className = 'import-preview-item';
            if (f.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = `data:${f.type};base64,${f.base64}`;
                div.appendChild(img);
            } else {
                div.classList.add('import-preview-pdf');
                div.innerHTML = `<span style="font-size:1.5rem;">📄</span><span>${f.file.name}</span>`;
            }
            const rm = document.createElement('button');
            rm.className = 'preview-remove';
            rm.textContent = '✕';
            rm.addEventListener('click', () => { this.files.splice(idx, 1); this.renderPreviews(); this.updateAnalyzeBtn(); });
            div.appendChild(rm);
            container.appendChild(div);
        });
    },

    updateAnalyzeBtn() {
        document.getElementById('btn-analyze').disabled = this.files.length === 0;
    },

    // Analyze with Gemini
    setupAnalyze() {
        document.getElementById('btn-analyze').addEventListener('click', () => this.analyze());
    },

    async analyze() {
        const apiKey = document.getElementById('gemini-api-key').value.trim();
        if (!apiKey) { UI.showToast('Ingresá tu API Key de Gemini', 'warning'); return; }
        if (this.files.length === 0) { UI.showToast('Subí al menos una imagen o PDF', 'warning'); return; }

        this.saveApiKey(apiKey);

        // Show loading
        document.getElementById('import-loading').classList.remove('hidden');
        document.getElementById('import-result').classList.add('hidden');
        document.getElementById('btn-analyze').disabled = true;

        try {
            const result = await this.callGemini(apiKey);
            this.parsedDiet = result;
            this.displayResult(result);
        } catch (err) {
            console.error('Gemini error:', err);
            UI.showToast('Error al analizar: ' + (err.message || 'Error desconocido'), 'error');
        } finally {
            document.getElementById('import-loading').classList.add('hidden');
            document.getElementById('btn-analyze').disabled = false;
        }
    },

    async callGemini(apiKey) {
        const prompt = `Sos un experto nutricionista argentino. Analizá las imágenes/documentos que muestran un plan de dieta.

Extraé TODA la información de las comidas y opciones. Devolvé ÚNICAMENTE un JSON válido con esta estructura exacta (sin markdown, sin backticks, solo el JSON puro):

{
  "meals": [
    {
      "name": "Desayuno",
      "emoji": "🌅",
      "calories": 500,
      "protein": 30,
      "carbs": 60,
      "fats": 15,
      "options": [
        {
          "name": "Opción A",
          "items": [
            { "food": "Avena", "grams": 60 },
            { "food": "Leche descremada", "grams": 200 },
            { "food": "Banana", "grams": 120 }
          ]
        }
      ]
    }
  ]
}

Reglas importantes:
- Cada comida (Desayuno, Almuerzo, Merienda, Cena, Colación, etc.) debe tener sus macros objetivo (calories, protein, carbs, fats) si los ves en la imagen. Si no los ves, estimá valores razonables.
- Si ves múltiples opciones para una comida (ej: "Opción A", "Opción B"), incluí todas como entries separadas en el array "options".
- Si solo hay una opción, poné una sola.
- Los gramos deben ser tu mejor estimación si no están especificados.
- Usá emojis apropiados: 🌅 Desayuno, ☀️ Almuerzo, 🍵 Merienda, 🌙 Cena, 🍎 Colación.
- Los nombres de alimentos deben ser claros y en español.
- Devolvé SOLAMENTE el JSON, nada más.`;

        // Build parts array
        const parts = [{ text: prompt }];
        for (const f of this.files) {
            parts.push({
                inline_data: {
                    mime_type: f.type,
                    data: f.base64
                }
            });
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts }],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 8192
                    }
                })
            }
        );

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Parse JSON from response (handle possible markdown wrapping)
        let jsonStr = text.trim();
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
        }

        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            // Try to find JSON in the text
            const match = jsonStr.match(/\{[\s\S]*\}/);
            if (match) return JSON.parse(match[0]);
            throw new Error('La IA no devolvió un JSON válido. Intentá de nuevo.');
        }
    },

    displayResult(result) {
        const container = document.getElementById('import-result');
        container.classList.remove('hidden');

        if (!result.meals || result.meals.length === 0) {
            container.innerHTML = '<p style="color:var(--text-muted);">No se encontraron comidas en la imagen. Intentá con una imagen más clara.</p>';
            return;
        }

        let html = '<h3>✅ Dieta detectada</h3>';
        result.meals.forEach(meal => {
            html += `<div class="import-result-meal">
                <h4>${meal.emoji || '🍽️'} ${meal.name}</h4>
                <div class="import-meal-macros">Objetivo: ${meal.calories || '?'} kcal · ${meal.protein || '?'}g P · ${meal.carbs || '?'}g C · ${meal.fats || '?'}g G</div>`;

            if (meal.options && meal.options.length > 0) {
                meal.options.forEach(opt => {
                    html += `<p style="font-weight:600;font-size:0.85rem;margin:8px 0 4px;color:var(--primary-300);">${opt.name}</p><ul>`;
                    (opt.items || []).forEach(item => {
                        html += `<li>${item.food} — ${item.grams}g</li>`;
                    });
                    html += '</ul>';
                });
            }
            html += '</div>';
        });

        html += `<div class="import-result-actions">
            <button class="btn btn-apply-import" id="btn-apply-import">✅ Aplicar esta dieta</button>
        </div>`;

        container.innerHTML = html;

        document.getElementById('btn-apply-import').addEventListener('click', () => {
            this.applyDiet(result);
        });
    },

    applyDiet(result) {
        const emojiMap = {
            'desayuno': '🌅', 'almuerzo': '☀️', 'merienda': '🍵',
            'cena': '🌙', 'colación': '🍎', 'colacion': '🍎', 'snack': '🍎'
        };

        // Clear existing meals
        Store.meals = [];

        result.meals.forEach(mealData => {
            const meal = {
                id: Store.uid(),
                name: mealData.name,
                emoji: mealData.emoji || emojiMap[mealData.name.toLowerCase()] || '🍽️',
                calories: mealData.calories || 0,
                protein: mealData.protein || 0,
                carbs: mealData.carbs || 0,
                fats: mealData.fats || 0,
                options: []
            };

            if (mealData.options && mealData.options.length > 0) {
                mealData.options.forEach(optData => {
                    const opt = {
                        id: Store.uid(),
                        name: optData.name || 'Opción',
                        items: []
                    };

                    (optData.items || []).forEach(itemData => {
                        // Try to find matching food in database
                        let matchedFood = this.findBestFoodMatch(itemData.food);

                        if (!matchedFood) {
                            // Add as new food with estimated macros
                            matchedFood = {
                                id: Store.uid(),
                                name: itemData.food,
                                category: 'otros',
                                calories: itemData.calories_per_100g || 100,
                                protein: itemData.protein_per_100g || 5,
                                carbs: itemData.carbs_per_100g || 10,
                                fats: itemData.fats_per_100g || 3
                            };
                            Store.foods.push(matchedFood);
                        }

                        opt.items.push({
                            id: Store.uid(),
                            foodId: matchedFood.id,
                            grams: itemData.grams || 100
                        });
                    });

                    meal.options.push(opt);
                });
            }

            Store.meals.push(meal);
        });

        Store.save();
        UI.renderMeals();
        UI.renderFoods();
        UI.updateDailySummary();

        document.getElementById('import-panel').classList.add('hidden');
        this.files = [];
        this.parsedDiet = null;
        document.getElementById('import-previews').innerHTML = '';
        document.getElementById('import-result').classList.add('hidden');

        UI.showToast('🎉 Dieta importada exitosamente!', 'success');
    },

    findBestFoodMatch(name) {
        if (!name) return null;
        const lower = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Exact match first
        let match = Store.foods.find(f =>
            f.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === lower
        );
        if (match) return match;

        // Contains match
        match = Store.foods.find(f => {
            const fn = f.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return fn.includes(lower) || lower.includes(fn);
        });
        if (match) return match;

        // Word overlap (at least 2 significant words in common)
        const inputWords = lower.split(/\s+/).filter(w => w.length > 2);
        let bestScore = 0;
        let bestMatch = null;
        Store.foods.forEach(f => {
            const fn = f.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const foodWords = fn.split(/\s+/).filter(w => w.length > 2);
            let score = 0;
            inputWords.forEach(w => { if (foodWords.some(fw => fw.includes(w) || w.includes(fw))) score++; });
            if (score > bestScore && score >= 1) { bestScore = score; bestMatch = f; }
        });

        return bestMatch;
    }
};

// Initialize after DOM
document.addEventListener('DOMContentLoaded', () => {
    DietImporter.init();
});
