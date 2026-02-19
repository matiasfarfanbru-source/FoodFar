// ===================================================================
// FarFood - Planificador Inteligente de Dieta
// Con sistema de opciones múltiples por comida
// ===================================================================

// ===== DATA STORE =====
const Store = {
    meals: [],
    foods: [],

    init() {
        const savedMeals = localStorage.getItem('farfood_meals_v2');
        const savedFoods = localStorage.getItem('farfood_foods_v2');

        if (savedFoods) {
            this.foods = JSON.parse(savedFoods);
        } else {
            this.foods = [
                // === PROTEÍNAS ===
                { id: this.uid(), name: 'Pechuga de pollo', category: 'proteinas', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
                { id: this.uid(), name: 'Huevo entero (unidad ~60g)', category: 'proteinas', calories: 155, protein: 13, carbs: 1.1, fats: 11 },
                { id: this.uid(), name: 'Atún en lata (escurrido)', category: 'proteinas', calories: 116, protein: 25.5, carbs: 0, fats: 0.8 },
                { id: this.uid(), name: 'Caballa en lata', category: 'proteinas', calories: 205, protein: 19, carbs: 0, fats: 14 },
                { id: this.uid(), name: 'Milanesa de pollo al horno', category: 'proteinas', calories: 195, protein: 26, carbs: 10, fats: 6 },
                { id: this.uid(), name: 'Milanesa de carne al horno', category: 'proteinas', calories: 215, protein: 22, carbs: 12, fats: 9 },
                { id: this.uid(), name: 'Carne al horno (filet)', category: 'proteinas', calories: 190, protein: 28, carbs: 0, fats: 8 },
                { id: this.uid(), name: 'Medallón de pollo sin rebozar', category: 'proteinas', calories: 150, protein: 22, carbs: 3, fats: 5.5 },
                { id: this.uid(), name: 'Patamuslo grande (cocido, sin piel)', category: 'proteinas', calories: 180, protein: 26, carbs: 0, fats: 8 },
                { id: this.uid(), name: 'Jamón cocido (feta ~20g)', category: 'proteinas', calories: 120, protein: 18, carbs: 1.5, fats: 4.5 },

                // === CARBOHIDRATOS ===
                { id: this.uid(), name: 'Arroz blanco (cocido)', category: 'carbohidratos', calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
                { id: this.uid(), name: 'Avena', category: 'carbohidratos', calories: 389, protein: 16.9, carbs: 66, fats: 6.9 },
                { id: this.uid(), name: 'Pan integral', category: 'carbohidratos', calories: 247, protein: 13, carbs: 41, fats: 3.4 },
                { id: this.uid(), name: 'Pan lactal', category: 'carbohidratos', calories: 265, protein: 8, carbs: 49, fats: 3.5 },
                { id: this.uid(), name: 'Galletas de arroz', category: 'carbohidratos', calories: 380, protein: 8, carbs: 82, fats: 2.5 },
                { id: this.uid(), name: 'Granola', category: 'carbohidratos', calories: 450, protein: 10, carbs: 64, fats: 17 },
                { id: this.uid(), name: 'Batata / Boniato (cocida)', category: 'carbohidratos', calories: 86, protein: 1.6, carbs: 20, fats: 0.1 },
                { id: this.uid(), name: 'Papa cocida', category: 'carbohidratos', calories: 87, protein: 1.9, carbs: 20, fats: 0.1 },
                { id: this.uid(), name: 'Fideos cocidos', category: 'carbohidratos', calories: 131, protein: 5, carbs: 25, fats: 1.1 },
                { id: this.uid(), name: 'Ravioles cocidos', category: 'carbohidratos', calories: 170, protein: 7, carbs: 24, fats: 5 },
                { id: this.uid(), name: 'Mermelada', category: 'carbohidratos', calories: 250, protein: 0.3, carbs: 62, fats: 0.1 },

                // === LÁCTEOS ===
                { id: this.uid(), name: 'Leche descremada', category: 'lacteos', calories: 34, protein: 3.4, carbs: 5, fats: 0.1 },
                { id: this.uid(), name: 'Leche de proteínas La Serenísima (200ml)', category: 'lacteos', calories: 70, protein: 15, carbs: 5, fats: 0, },
                { id: this.uid(), name: 'Yogur natural', category: 'lacteos', calories: 61, protein: 3.5, carbs: 4.7, fats: 3.3 },
                { id: this.uid(), name: 'Queso crema light', category: 'lacteos', calories: 150, protein: 7, carbs: 5, fats: 11 },
                { id: this.uid(), name: 'Queso cremoso', category: 'lacteos', calories: 300, protein: 22, carbs: 1, fats: 23 },
                { id: this.uid(), name: 'Queso tybo (feta ~30g)', category: 'lacteos', calories: 330, protein: 25, carbs: 0.5, fats: 25 },

                // === FRUTAS ===
                { id: this.uid(), name: 'Banana', category: 'frutas', calories: 89, protein: 1.1, carbs: 23, fats: 0.3 },
                { id: this.uid(), name: 'Manzana', category: 'frutas', calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
                { id: this.uid(), name: 'Naranja', category: 'frutas', calories: 47, protein: 0.9, carbs: 12, fats: 0.1 },
                { id: this.uid(), name: 'Mandarina', category: 'frutas', calories: 53, protein: 0.8, carbs: 13, fats: 0.3 },
                { id: this.uid(), name: 'Frutilla', category: 'frutas', calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3 },
                { id: this.uid(), name: 'Durazno', category: 'frutas', calories: 39, protein: 0.9, carbs: 10, fats: 0.3 },
                { id: this.uid(), name: 'Pera', category: 'frutas', calories: 57, protein: 0.4, carbs: 15, fats: 0.1 },
                { id: this.uid(), name: 'Kiwi', category: 'frutas', calories: 61, protein: 1.1, carbs: 15, fats: 0.5 },
                { id: this.uid(), name: 'Arándanos', category: 'frutas', calories: 57, protein: 0.7, carbs: 14, fats: 0.3 },

                // === VERDURAS ===
                { id: this.uid(), name: 'Lechuga', category: 'verduras', calories: 15, protein: 1.4, carbs: 2.9, fats: 0.2 },
                { id: this.uid(), name: 'Tomate', category: 'verduras', calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2 },

                // === GRASAS ===
                { id: this.uid(), name: 'Aceite de oliva', category: 'grasas', calories: 884, protein: 0, carbs: 0, fats: 100 },
                { id: this.uid(), name: 'Palta / Aguacate', category: 'grasas', calories: 160, protein: 2, carbs: 9, fats: 15 },
            ];
        }

        if (savedMeals) {
            this.meals = JSON.parse(savedMeals);
        } else {
            this.meals = [
                { id: this.uid(), name: 'Desayuno', emoji: '🌅', calories: 500, protein: 30, carbs: 60, fats: 15, options: [] },
                { id: this.uid(), name: 'Almuerzo', emoji: '☀️', calories: 700, protein: 45, carbs: 80, fats: 20, options: [] },
                { id: this.uid(), name: 'Merienda', emoji: '🍵', calories: 300, protein: 15, carbs: 35, fats: 10, options: [] },
                { id: this.uid(), name: 'Cena', emoji: '🌙', calories: 500, protein: 35, carbs: 50, fats: 18, options: [] },
            ];
        }
        this.save();
    },

    save() {
        localStorage.setItem('farfood_meals_v2', JSON.stringify(this.meals));
        localStorage.setItem('farfood_foods_v2', JSON.stringify(this.foods));
    },

    uid() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    },

    addMeal(meal) { this.meals.push(meal); this.save(); },

    updateMeal(id, data) {
        const idx = this.meals.findIndex(m => m.id === id);
        if (idx !== -1) { this.meals[idx] = { ...this.meals[idx], ...data }; this.save(); }
    },

    deleteMeal(id) { this.meals = this.meals.filter(m => m.id !== id); this.save(); },

    addFood(food) { this.foods.push(food); this.save(); },

    deleteFood(id) {
        this.foods = this.foods.filter(f => f.id !== id);
        this.meals.forEach(meal => {
            if (meal.options) {
                meal.options.forEach(opt => {
                    opt.items = opt.items.filter(item => item.foodId !== id);
                });
            }
        });
        this.save();
    },

    getFoodById(id) { return this.foods.find(f => f.id === id); },

    // Option helpers
    addOption(mealId) {
        const meal = this.meals.find(m => m.id === mealId);
        if (!meal) return null;
        if (!meal.options) meal.options = [];
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const opt = { id: this.uid(), name: `Opción ${letters[meal.options.length] || meal.options.length + 1}`, items: [] };
        meal.options.push(opt);
        this.save();
        return opt;
    },

    deleteOption(mealId, optionId) {
        const meal = this.meals.find(m => m.id === mealId);
        if (!meal) return;
        meal.options = meal.options.filter(o => o.id !== optionId);
        this.save();
    },

    addFoodToOption(mealId, optionId, foodId, grams) {
        const meal = this.meals.find(m => m.id === mealId);
        if (!meal) return;
        const opt = meal.options.find(o => o.id === optionId);
        if (!opt) return;
        opt.items.push({ id: this.uid(), foodId, grams: grams || 100 });
        this.save();
    },

    removeFoodFromOption(mealId, optionId, itemId) {
        const meal = this.meals.find(m => m.id === mealId);
        if (!meal) return;
        const opt = meal.options.find(o => o.id === optionId);
        if (!opt) return;
        opt.items = opt.items.filter(i => i.id !== itemId);
        this.save();
    },

    updateItemGrams(mealId, optionId, itemId, grams) {
        const meal = this.meals.find(m => m.id === mealId);
        if (!meal) return;
        const opt = meal.options.find(o => o.id === optionId);
        if (!opt) return;
        const item = opt.items.find(i => i.id === itemId);
        if (item) { item.grams = grams; this.save(); }
    },

    calcOptionMacros(option) {
        let cal = 0, prot = 0, carbs = 0, fats = 0;
        if (!option || !option.items) return { cal, prot, carbs, fats };
        option.items.forEach(item => {
            const food = this.getFoodById(item.foodId);
            if (!food) return;
            const factor = (item.grams || 0) / 100;
            cal += food.calories * factor;
            prot += food.protein * factor;
            carbs += food.carbs * factor;
            fats += food.fats * factor;
        });
        return { cal: Math.round(cal), prot: +prot.toFixed(1), carbs: +carbs.toFixed(1), fats: +fats.toFixed(1) };
    }
};

// ===== UI CONTROLLER =====
const UI = {
    currentSection: 'diet',
    selectedMealId: null,
    selectedFoodIds: new Set(),
    currentFilter: 'all',

    init() {
        this.setupNavigation();
        this.setupParticles();
        this.renderMeals();
        this.renderFoods();
        this.renderCalculator();
        this.setupFoodForm();
        this.setupAddMeal();
        this.setupCalculateButton();
        this.setupModal();
        this.updateDailySummary();
    },

    // ----- Navigation -----
    setupNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchSection(btn.dataset.section));
        });
    },

    switchSection(section) {
        this.currentSection = section;
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.section === section));
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        const target = document.getElementById(`section-${section}`);
        if (target) target.classList.add('active');
        if (section === 'calculator') this.renderCalculator();
    },

    setupParticles() {
        const c = document.getElementById('particles');
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const s = Math.random() * 4 + 2;
            Object.assign(p.style, { width: s + 'px', height: s + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', animationDelay: Math.random() * 15 + 's', animationDuration: (Math.random() * 10 + 10) + 's' });
            c.appendChild(p);
        }
    },

    // ----- Daily Summary -----
    updateDailySummary() {
        let tC = 0, tP = 0, tCb = 0, tF = 0;
        Store.meals.forEach(m => { tC += Number(m.calories) || 0; tP += Number(m.protein) || 0; tCb += Number(m.carbs) || 0; tF += Number(m.fats) || 0; });
        document.getElementById('total-calories').textContent = Math.round(tC);
        document.getElementById('total-protein').textContent = Math.round(tP) + 'g';
        document.getElementById('total-carbs').textContent = Math.round(tCb) + 'g';
        document.getElementById('total-fats').textContent = Math.round(tF) + 'g';
        const pCal = tP * 4, cCal = tCb * 4, fCal = tF * 9, total = pCal + cCal + fCal;
        if (total > 0) {
            const pp = Math.round(pCal / total * 100), pc = Math.round(cCal / total * 100), pf = 100 - pp - pc;
            document.getElementById('bar-protein').style.width = pp + '%';
            document.getElementById('bar-carbs').style.width = pc + '%';
            document.getElementById('bar-fats').style.width = pf + '%';
            document.getElementById('pct-protein').textContent = pp + '%';
            document.getElementById('pct-carbs').textContent = pc + '%';
            document.getElementById('pct-fats').textContent = pf + '%';
        }
    },

    // ----- Meals with Options -----
    renderMeals() {
        const container = document.getElementById('meals-container');
        container.innerHTML = '';
        Store.meals.forEach(meal => {
            const card = document.createElement('div');
            card.className = 'meal-card glass-card';
            card.id = `meal-${meal.id}`;

            // Build options HTML
            const optionsHtml = (meal.options || []).map(opt => this.buildOptionHtml(meal, opt)).join('');

            card.innerHTML = `
                <div class="meal-header">
                    <div class="meal-header-left">
                        <div class="meal-emoji">${meal.emoji}</div>
                        <div class="meal-info">
                            <h3>${meal.name}</h3>
                            <div class="meal-macros-preview">Objetivo: ${meal.calories} kcal · ${meal.protein}g P · ${meal.carbs}g C · ${meal.fats}g G</div>
                        </div>
                    </div>
                    <div class="meal-actions">
                        <button class="meal-action-btn edit" title="Editar" data-meal-id="${meal.id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button class="meal-action-btn delete" title="Eliminar" data-meal-id="${meal.id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                    </div>
                </div>
                <div class="meal-body">
                    <div class="meal-targets">
                        <div class="target-input-group calories">
                            <label>🔥 Calorías</label>
                            <input type="number" value="${meal.calories}" data-meal-id="${meal.id}" data-field="calories" min="0">
                        </div>
                        <div class="target-input-group protein">
                            <label>💪 Proteínas (g)</label>
                            <input type="number" value="${meal.protein}" data-meal-id="${meal.id}" data-field="protein" min="0" step="0.1">
                        </div>
                        <div class="target-input-group carbs">
                            <label>⚡ Carbos (g)</label>
                            <input type="number" value="${meal.carbs}" data-meal-id="${meal.id}" data-field="carbs" min="0" step="0.1">
                        </div>
                        <div class="target-input-group fats">
                            <label>🥑 Grasas (g)</label>
                            <input type="number" value="${meal.fats}" data-meal-id="${meal.id}" data-field="fats" min="0" step="0.1">
                        </div>
                    </div>

                    <div class="meal-options-section">
                        <div class="options-header">
                            <h4>📋 Opciones de comida</h4>
                        </div>
                        <div class="options-list" id="options-${meal.id}">
                            ${optionsHtml}
                        </div>
                        <button class="btn-add-option" data-meal-id="${meal.id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            Agregar Opción
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        this.setupMealEvents();
    },

    buildOptionHtml(meal, opt) {
        const macros = Store.calcOptionMacros(opt);
        const diff = this.calcDiffStatus(meal, macros);

        let itemsHtml = '';
        (opt.items || []).forEach(item => {
            const food = Store.getFoodById(item.foodId);
            if (!food) return;
            const f = (item.grams || 0) / 100;
            itemsHtml += `
                <div class="option-food-item">
                    <div class="option-food-info">
                        <span class="option-food-name">${food.name}</span>
                        <span class="option-food-macros">${Math.round(food.calories * f)} kcal · ${(food.protein * f).toFixed(1)}g P · ${(food.carbs * f).toFixed(1)}g C · ${(food.fats * f).toFixed(1)}g G</span>
                    </div>
                    <div class="option-food-controls">
                        <input type="number" class="grams-input" value="${item.grams}" min="0" step="5" 
                            data-meal-id="${meal.id}" data-option-id="${opt.id}" data-item-id="${item.id}">
                        <span class="grams-label">g</span>
                        <button class="option-food-remove" data-meal-id="${meal.id}" data-option-id="${opt.id}" data-item-id="${item.id}" title="Quitar">✕</button>
                    </div>
                </div>`;
        });

        return `
            <div class="option-card" data-option-id="${opt.id}">
                <div class="option-header">
                    <div class="option-title-row">
                        <span class="option-label">${opt.name}</span>
                        <span class="option-status ${diff.cls}" title="${diff.title}">${diff.icon}</span>
                        <button class="option-delete-btn" data-meal-id="${meal.id}" data-option-id="${opt.id}" title="Eliminar opción">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                    </div>
                    <div class="option-macros-bar">
                        <span class="om-cal">🔥 ${macros.cal} kcal</span>
                        <span class="om-prot">💪 ${macros.prot}g P</span>
                        <span class="om-carbs">⚡ ${macros.carbs}g C</span>
                        <span class="om-fats">🥑 ${macros.fats}g G</span>
                    </div>
                </div>
                <div class="option-items">
                    ${itemsHtml || '<p class="option-empty">Sin alimentos. Agregá alimentos a esta opción.</p>'}
                </div>
                <div class="option-footer">
                    <button class="btn-add-food-to-option" data-meal-id="${meal.id}" data-option-id="${opt.id}">
                        + Agregar alimento
                    </button>
                    <button class="btn-auto-calc-option" data-meal-id="${meal.id}" data-option-id="${opt.id}" title="Calcular porciones automáticamente con IA">
                        🧠 Calcular porciones
                    </button>
                </div>
            </div>`;
    },

    calcDiffStatus(meal, macros) {
        if (!macros || (macros.cal === 0 && macros.prot === 0)) {
            return { cls: 'neutral', icon: '⬜', title: 'Sin alimentos' };
        }
        const tCal = Number(meal.calories) || 1;
        const tProt = Number(meal.protein) || 1;
        const tCarbs = Number(meal.carbs) || 1;
        const tFats = Number(meal.fats) || 1;
        const errors = [
            Math.abs(macros.cal - tCal) / tCal,
            Math.abs(macros.prot - tProt) / tProt,
            Math.abs(macros.carbs - tCarbs) / tCarbs,
            Math.abs(macros.fats - tFats) / tFats
        ];
        const avg = errors.reduce((a, b) => a + b, 0) / errors.length;
        if (avg <= 0.10) return { cls: 'good', icon: '✅', title: `Precisión: ${Math.round((1 - avg) * 100)}% — Excelente coincidencia` };
        if (avg <= 0.25) return { cls: 'warning', icon: '🟡', title: `Precisión: ${Math.round((1 - avg) * 100)}% — Coincidencia aceptable` };
        return { cls: 'bad', icon: '🔴', title: `Precisión: ${Math.round((1 - avg) * 100)}% — Alejado del objetivo` };
    },

    setupMealEvents() {
        // Target inputs
        document.querySelectorAll('.target-input-group input').forEach(input => {
            input.addEventListener('change', (e) => {
                const mealId = e.target.dataset.mealId;
                const field = e.target.dataset.field;
                Store.updateMeal(mealId, { [field]: parseFloat(e.target.value) || 0 });
                this.updateDailySummary();
                this.renderMeals();
            });
        });

        // Delete meal
        document.querySelectorAll('.meal-action-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                Store.deleteMeal(btn.dataset.mealId);
                this.renderMeals();
                this.updateDailySummary();
                this.showToast('Comida eliminada', 'success');
            });
        });

        // Edit meal (rename)
        document.querySelectorAll('.meal-action-btn.edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const meal = Store.meals.find(m => m.id === btn.dataset.mealId);
                if (meal) this.showEditMealModal(meal);
            });
        });

        // Add option
        document.querySelectorAll('.btn-add-option').forEach(btn => {
            btn.addEventListener('click', () => {
                Store.addOption(btn.dataset.mealId);
                this.renderMeals();
                this.showToast('Opción agregada', 'success');
            });
        });

        // Delete option
        document.querySelectorAll('.option-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                Store.deleteOption(btn.dataset.mealId, btn.dataset.optionId);
                this.renderMeals();
                this.showToast('Opción eliminada', 'success');
            });
        });

        // Add food to option
        document.querySelectorAll('.btn-add-food-to-option').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showAddFoodToOptionModal(btn.dataset.mealId, btn.dataset.optionId);
            });
        });

        // Remove food from option
        document.querySelectorAll('.option-food-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                Store.removeFoodFromOption(btn.dataset.mealId, btn.dataset.optionId, btn.dataset.itemId);
                this.renderMeals();
            });
        });

        // Grams input change
        document.querySelectorAll('.grams-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const grams = parseFloat(e.target.value) || 0;
                Store.updateItemGrams(e.target.dataset.mealId, e.target.dataset.optionId, e.target.dataset.itemId, grams);
                this.renderMeals();
            });
        });

        // Auto-calc option
        document.querySelectorAll('.btn-auto-calc-option').forEach(btn => {
            btn.addEventListener('click', () => {
                this.autoCalcOption(btn.dataset.mealId, btn.dataset.optionId);
            });
        });
    },

    autoCalcOption(mealId, optionId) {
        const meal = Store.meals.find(m => m.id === mealId);
        if (!meal) return;
        const opt = meal.options.find(o => o.id === optionId);
        if (!opt || opt.items.length === 0) {
            this.showToast('Agregá alimentos a la opción primero', 'warning');
            return;
        }

        const foods = opt.items.map(item => ({ item, food: Store.getFoodById(item.foodId) })).filter(x => x.food);
        if (foods.length === 0) return;

        const targetCal = Number(meal.calories) || 0;
        const targetProt = Number(meal.protein) || 0;
        const targetCarbs = Number(meal.carbs) || 0;
        const targetFats = Number(meal.fats) || 0;

        const n = foods.length;
        let portions = new Array(n);

        // Initialize
        const calPerFood = targetCal / n;
        for (let i = 0; i < n; i++) {
            portions[i] = foods[i].food.calories > 0 ? (calPerFood / foods[i].food.calories) * 100 : 100;
        }

        const weights = { cal: 1, prot: 4, carbs: 2, fats: 3 };
        const lr = 0.05;

        for (let iter = 0; iter < 5000; iter++) {
            let cC = 0, cP = 0, cCb = 0, cF = 0;
            for (let i = 0; i < n; i++) {
                const f = portions[i] / 100;
                cC += foods[i].food.calories * f;
                cP += foods[i].food.protein * f;
                cCb += foods[i].food.carbs * f;
                cF += foods[i].food.fats * f;
            }
            const eC = (cC - targetCal) / (targetCal || 1);
            const eP = (cP - targetProt) / (targetProt || 1);
            const eCb = (cCb - targetCarbs) / (targetCarbs || 1);
            const eF = (cF - targetFats) / (targetFats || 1);

            for (let i = 0; i < n; i++) {
                const dC = (foods[i].food.calories / 100) / (targetCal || 1);
                const dP = (foods[i].food.protein / 100) / (targetProt || 1);
                const dCb = (foods[i].food.carbs / 100) / (targetCarbs || 1);
                const dF = (foods[i].food.fats / 100) / (targetFats || 1);
                const grad = 2 * (weights.cal * eC * dC + weights.prot * eP * dP + weights.carbs * eCb * dCb + weights.fats * eF * dF);
                portions[i] -= lr * grad * 100;
                if (portions[i] < 0) portions[i] = 0;
                if (portions[i] > 1000) portions[i] = 1000;
            }
        }

        // Apply rounded portions
        for (let i = 0; i < n; i++) {
            const rounded = Math.round(portions[i] / 5) * 5;
            Store.updateItemGrams(mealId, optionId, foods[i].item.id, rounded);
        }

        this.renderMeals();
        this.showToast('✨ Porciones calculadas automáticamente', 'success');
    },

    setupAddMeal() {
        document.getElementById('btn-add-meal').addEventListener('click', () => {
            const emojis = ['🍳', '🥗', '🍲', '🥪', '🍜', '🥘', '🫕', '🥣'];
            Store.addMeal({
                id: Store.uid(),
                name: `Comida ${Store.meals.length + 1}`,
                emoji: emojis[Store.meals.length % emojis.length],
                calories: 400, protein: 25, carbs: 45, fats: 12,
                options: []
            });
            this.renderMeals();
            this.updateDailySummary();
            this.showToast('Comida agregada', 'success');
        });
    },

    // ----- Foods -----
    renderFoods(filter = this.currentFilter) {
        this.currentFilter = filter;
        const grid = document.getElementById('food-grid');
        grid.innerHTML = '';
        const filtered = filter === 'all' ? Store.foods : Store.foods.filter(f => f.category === filter);
        if (filtered.length === 0) {
            grid.innerHTML = `<div class="food-grid-empty"><div class="empty-icon">🍽️</div><p>No hay alimentos registrados${filter !== 'all' ? ' en esta categoría' : ''}.</p><p style="font-size:0.85rem;margin-top:8px;">Agregá alimentos usando el formulario de arriba.</p></div>`;
            return;
        }
        const ce = { proteinas: '🥩', carbohidratos: '🍚', grasas: '🥑', frutas: '🍎', verduras: '🥬', lacteos: '🥛', otros: '🍽️' };
        const cn = { proteinas: 'Proteínas', carbohidratos: 'Carbohidratos', grasas: 'Grasas', frutas: 'Frutas', verduras: 'Verduras', lacteos: 'Lácteos', otros: 'Otros' };
        filtered.forEach(food => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div class="food-card-header"><div><div class="food-card-name">${ce[food.category] || '🍽️'} ${food.name}</div><div class="food-card-category">${cn[food.category] || food.category}</div></div>
                <button class="food-card-delete" data-food-id="${food.id}" title="Eliminar"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button></div>
                <div class="food-card-macros">
                    <div class="food-macro cal"><div class="food-macro-value">${food.calories}</div><div class="food-macro-label">Calorías</div></div>
                    <div class="food-macro prot"><div class="food-macro-value">${food.protein}g</div><div class="food-macro-label">Proteínas</div></div>
                    <div class="food-macro carb"><div class="food-macro-value">${food.carbs}g</div><div class="food-macro-label">Carbos</div></div>
                    <div class="food-macro fat"><div class="food-macro-value">${food.fats}g</div><div class="food-macro-label">Grasas</div></div>
                </div>`;
            grid.appendChild(card);
        });
        grid.querySelectorAll('.food-card-delete').forEach(btn => {
            btn.addEventListener('click', () => { Store.deleteFood(btn.dataset.foodId); this.renderFoods(); this.renderMeals(); this.showToast('Alimento eliminado', 'success'); });
        });
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === this.currentFilter);
            btn.onclick = () => this.renderFoods(btn.dataset.filter);
        });
    },

    setupFoodForm() {
        document.getElementById('food-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('food-name').value.trim();
            if (!name) { this.showToast('Ingresá un nombre', 'warning'); return; }
            Store.addFood({
                id: Store.uid(), name,
                category: document.getElementById('food-category').value,
                calories: parseFloat(document.getElementById('food-calories').value) || 0,
                protein: parseFloat(document.getElementById('food-protein').value) || 0,
                carbs: parseFloat(document.getElementById('food-carbs').value) || 0,
                fats: parseFloat(document.getElementById('food-fats').value) || 0
            });
            e.target.reset();
            this.renderFoods();
            this.showToast(`"${name}" agregado`, 'success');
        });
    },

    // ----- Calculator -----
    renderCalculator() {
        this.renderMealSelector();
        this.renderAvailableFoods();
        this.updateCalculateButton();
    },

    renderMealSelector() {
        const c = document.getElementById('meal-selector');
        c.innerHTML = '';
        if (Store.meals.length === 0) { c.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">No hay comidas configuradas.</p>'; return; }
        Store.meals.forEach(meal => {
            const card = document.createElement('div');
            card.className = `meal-select-card ${this.selectedMealId === meal.id ? 'selected' : ''}`;
            card.innerHTML = `<div class="meal-select-emoji">${meal.emoji}</div><div class="meal-select-name">${meal.name}</div><div class="meal-select-targets">${meal.calories} kcal · ${meal.protein}g P · ${meal.carbs}g C · ${meal.fats}g G</div>`;
            card.addEventListener('click', () => { this.selectedMealId = meal.id; this.selectedFoodIds.clear(); this.renderCalculator(); });
            c.appendChild(card);
        });
    },

    renderAvailableFoods() {
        const c = document.getElementById('available-foods-grid');
        c.innerHTML = '';
        if (!this.selectedMealId) { c.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">Primero seleccioná una comida arriba.</p>'; return; }
        if (Store.foods.length === 0) { c.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">No hay alimentos registrados.</p>'; return; }
        Store.foods.forEach(food => {
            const sel = this.selectedFoodIds.has(food.id);
            const card = document.createElement('div');
            card.className = `available-food-card ${sel ? 'selected' : ''}`;
            card.innerHTML = `<div class="food-check">${sel ? '✓' : ''}</div><div class="available-food-name">${food.name}</div><div class="available-food-info">${food.calories} kcal · P${food.protein}g · C${food.carbs}g · G${food.fats}g</div>`;
            card.addEventListener('click', () => { sel ? this.selectedFoodIds.delete(food.id) : this.selectedFoodIds.add(food.id); this.renderAvailableFoods(); this.updateCalculateButton(); });
            c.appendChild(card);
        });
    },

    updateCalculateButton() {
        document.getElementById('btn-calculate').disabled = !(this.selectedMealId && this.selectedFoodIds.size > 0);
    },

    setupCalculateButton() {
        document.getElementById('btn-calculate').addEventListener('click', () => this.calculatePortions());
    },

    calculatePortions() {
        const meal = Store.meals.find(m => m.id === this.selectedMealId);
        if (!meal) return;
        const foods = Array.from(this.selectedFoodIds).map(id => Store.getFoodById(id)).filter(Boolean);
        if (foods.length === 0) return;
        const tC = Number(meal.calories) || 0, tP = Number(meal.protein) || 0, tCb = Number(meal.carbs) || 0, tF = Number(meal.fats) || 0;
        const n = foods.length;
        let portions = new Array(n);
        const cpf = tC / n;
        for (let i = 0; i < n; i++) portions[i] = foods[i].calories > 0 ? (cpf / foods[i].calories) * 100 : 100;
        const w = { cal: 1, prot: 4, carbs: 2, fats: 3 };
        for (let iter = 0; iter < 5000; iter++) {
            let cC = 0, cP = 0, cCb2 = 0, cF = 0;
            for (let i = 0; i < n; i++) { const f = portions[i] / 100; cC += foods[i].calories * f; cP += foods[i].protein * f; cCb2 += foods[i].carbs * f; cF += foods[i].fats * f; }
            const eC = (cC - tC) / (tC || 1), eP = (cP - tP) / (tP || 1), eCb = (cCb2 - tCb) / (tCb || 1), eF = (cF - tF) / (tF || 1);
            for (let i = 0; i < n; i++) {
                const dC = (foods[i].calories / 100) / (tC || 1), dP = (foods[i].protein / 100) / (tP || 1), dCb = (foods[i].carbs / 100) / (tCb || 1), dF = (foods[i].fats / 100) / (tF || 1);
                portions[i] -= 0.05 * 2 * (w.cal * eC * dC + w.prot * eP * dP + w.carbs * eCb * dCb + w.fats * eF * dF) * 100;
                if (portions[i] < 0) portions[i] = 0; if (portions[i] > 1000) portions[i] = 1000;
            }
        }
        portions = portions.map(p => Math.round(p / 5) * 5);
        let fC = 0, fP = 0, fCb = 0, fF = 0;
        for (let i = 0; i < n; i++) { const f = portions[i] / 100; fC += foods[i].calories * f; fP += foods[i].protein * f; fCb += foods[i].carbs * f; fF += foods[i].fats * f; }
        this.displayResults(meal, foods, portions, { targetCal: tC, targetProt: tP, targetCarbs: tCb, targetFats: tF, finalCal: fC, finalProt: fP, finalCarbs: fCb, finalFats: fF });
    },

    displayResults(meal, foods, portions, m) {
        const r = document.getElementById('calc-results');
        r.classList.remove('hidden');
        document.getElementById('results-meal-name').textContent = `${meal.emoji} ${meal.name}`;
        const md = (a, t) => { const d = a - t, p = t > 0 ? Math.round(d / t * 100) : 0, s = d >= 0 ? '+' : ''; let c = 'good'; if (Math.abs(p) > 15) c = 'warning'; if (Math.abs(p) > 30) c = 'bad'; return { text: `${s}${Math.round(d)} (${s}${p}%)`, cls: c }; };
        const cd = md(m.finalCal, m.targetCal), pd = md(m.finalProt, m.targetProt), cbd = md(m.finalCarbs, m.targetCarbs), fd = md(m.finalFats, m.targetFats);
        document.getElementById('results-comparison').innerHTML = `
            <div class="comparison-item cal"><div class="comparison-label">Calorías</div><div class="comparison-target">Objetivo: ${m.targetCal}</div><div class="comparison-actual">${Math.round(m.finalCal)}</div><div class="comparison-diff ${cd.cls}">${cd.text}</div></div>
            <div class="comparison-item prot"><div class="comparison-label">Proteínas</div><div class="comparison-target">Objetivo: ${m.targetProt}g</div><div class="comparison-actual">${m.finalProt.toFixed(1)}g</div><div class="comparison-diff ${pd.cls}">${pd.text}</div></div>
            <div class="comparison-item carb"><div class="comparison-label">Carbohidratos</div><div class="comparison-target">Objetivo: ${m.targetCarbs}g</div><div class="comparison-actual">${m.finalCarbs.toFixed(1)}g</div><div class="comparison-diff ${cbd.cls}">${cbd.text}</div></div>
            <div class="comparison-item fat"><div class="comparison-label">Grasas</div><div class="comparison-target">Objetivo: ${m.targetFats}g</div><div class="comparison-actual">${m.finalFats.toFixed(1)}g</div><div class="comparison-diff ${fd.cls}">${fd.text}</div></div>`;
        let ph = '<h3>📏 Porciones Recomendadas</h3>';
        foods.forEach((food, i) => { if (portions[i] > 0) { const f = portions[i] / 100; ph += `<div class="portion-item"><div class="portion-left"><div><div class="portion-name">${food.name}</div><div class="portion-macros-detail">${Math.round(food.calories * f)} kcal · ${(food.protein * f).toFixed(1)}g P · ${(food.carbs * f).toFixed(1)}g C · ${(food.fats * f).toFixed(1)}g G</div></div></div><div class="portion-amount"><div class="portion-grams">${portions[i]}</div><div class="portion-unit">gramos</div></div></div>`; } });
        document.getElementById('results-portions').innerHTML = ph;
        const errs = [];
        if (m.targetCal > 0) errs.push(Math.abs(m.finalCal - m.targetCal) / m.targetCal);
        if (m.targetProt > 0) errs.push(Math.abs(m.finalProt - m.targetProt) / m.targetProt);
        if (m.targetCarbs > 0) errs.push(Math.abs(m.finalCarbs - m.targetCarbs) / m.targetCarbs);
        if (m.targetFats > 0) errs.push(Math.abs(m.finalFats - m.targetFats) / m.targetFats);
        const acc = errs.length ? Math.max(0, Math.round((1 - errs.reduce((a, b) => a + b, 0) / errs.length) * 100)) : 100;
        document.getElementById('results-accuracy').innerHTML = `<div class="accuracy-title">📊 Precisión del cálculo</div><div class="accuracy-bar-container"><div class="accuracy-bar"><div class="accuracy-bar-fill" style="width:0%;" id="accuracy-fill"></div></div><div class="accuracy-value">${acc}%</div></div>`;
        setTimeout(() => { document.getElementById('accuracy-fill').style.width = acc + '%'; }, 100);
        r.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    // ----- Modal -----
    setupModal() {
        const overlay = document.getElementById('modal-overlay');
        document.getElementById('modal-close').addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeModal(); });
    },
    openModal(title, bodyHtml) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-body').innerHTML = bodyHtml;
        document.getElementById('modal-overlay').classList.remove('hidden');
    },
    closeModal() { document.getElementById('modal-overlay').classList.add('hidden'); },

    showEditMealModal(meal) {
        const emojis = ['🌅', '☀️', '🍵', '🌙', '🍳', '🥗', '🍲', '🥪', '🍜', '🥘', '🫕', '🥣', '🧁', '🥞', '🍕'];
        this.openModal('Editar Comida', `
            <div style="display:flex;flex-direction:column;gap:16px;">
                <div class="form-group"><label for="edit-meal-name">Nombre</label><input type="text" id="edit-meal-name" value="${meal.name}"></div>
                <div class="form-group"><label>Emoji</label><div style="display:flex;flex-wrap:wrap;gap:8px;" id="emoji-picker">${emojis.map(e => `<div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;border-radius:8px;cursor:pointer;border:2px solid ${e === meal.emoji ? 'var(--primary-500)' : 'var(--border-color)'};background:${e === meal.emoji ? 'rgba(99,102,241,0.15)' : 'transparent'};transition:all 0.15s;" class="emoji-option" data-emoji="${e}">${e}</div>`).join('')}</div></div>
                <button class="btn btn-primary" id="save-meal-edit" style="width:100%;justify-content:center;">Guardar</button>
            </div>`);
        let selE = meal.emoji;
        document.querySelectorAll('.emoji-option').forEach(o => o.addEventListener('click', () => {
            selE = o.dataset.emoji;
            document.querySelectorAll('.emoji-option').forEach(x => { x.style.borderColor = x.dataset.emoji === selE ? 'var(--primary-500)' : 'var(--border-color)'; x.style.background = x.dataset.emoji === selE ? 'rgba(99,102,241,0.15)' : 'transparent'; });
        }));
        document.getElementById('save-meal-edit').addEventListener('click', () => {
            const name = document.getElementById('edit-meal-name').value.trim();
            if (name) { Store.updateMeal(meal.id, { name, emoji: selE }); this.renderMeals(); this.closeModal(); this.showToast('Comida actualizada', 'success'); }
        });
    },

    showAddFoodToOptionModal(mealId, optionId) {
        const meal = Store.meals.find(m => m.id === mealId);
        if (!meal) return;
        const opt = meal.options.find(o => o.id === optionId);
        if (!opt) return;
        const existingIds = new Set(opt.items.map(i => i.foodId));
        const available = Store.foods.filter(f => !existingIds.has(f.id));

        this.openModal(`Agregar alimento a ${opt.name}`, `
            <div class="modal-food-list" id="modal-food-list">
                ${available.length === 0 ? '<p style="color:var(--text-muted);text-align:center;padding:20px;">Todos los alimentos ya están en esta opción, o no hay alimentos registrados.</p>' :
                available.map(food => `
                    <div class="modal-food-item" data-food-id="${food.id}" style="cursor:pointer;">
                        <div class="modal-food-check"></div>
                        <div class="modal-food-item-info">
                            <div class="modal-food-item-name">${food.name}</div>
                            <div class="modal-food-item-macros">${food.calories} kcal · P${food.protein}g · C${food.carbs}g · G${food.fats}g</div>
                        </div>
                    </div>`).join('')}
            </div>`);

        document.querySelectorAll('.modal-food-item').forEach(item => {
            item.addEventListener('click', () => {
                const foodId = item.dataset.foodId;
                Store.addFoodToOption(mealId, optionId, foodId, 100);
                this.closeModal();
                this.renderMeals();
                this.showToast('Alimento agregado a la opción', 'success');
            });
        });
    },

    // ----- Toast -----
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icons = { success: '✅', warning: '⚠️', error: '❌' };
        toast.innerHTML = `<span>${icons[type] || '💡'}</span> ${message}`;
        container.appendChild(toast);
        setTimeout(() => { toast.style.animation = 'toastOut 0.3s ease-in forwards'; setTimeout(() => toast.remove(), 300); }, 3000);
    }
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => { Store.init(); UI.init(); });
