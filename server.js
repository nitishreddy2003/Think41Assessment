const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const db = {
    productTemplates: {},
    optionCategories: {},
    optionChoices: {},
};

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.post('/product-templates', (req, res) => {
    const { template_str_id, name, base_price } = req.body;

    if (!template_str_id || !name || base_price === undefined) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    const newTemplate = {
        id: template_str_id,
        name,
        base_price,
        categories: [],
        compatibility_rules: [],
    };

    db.productTemplates[template_str_id] = newTemplate;
    console.log('Database state:', db);
    res.status(201).json({ id: template_str_id });
});

app.post('/product-templates/:template_str_id/option-categories', (req, res) => {
    const { template_str_id } = req.params;
    const { category_str_id, name } = req.body;

    const template = db.productTemplates[template_str_id];
    if (!template) {
        return res.status(404).json({ error: 'Template not found.' });
    }

    const newCategory = {
        id: category_str_id,
        name,
        choices: [],
    };

    db.optionCategories[category_str_id] = newCategory;
    template.categories.push(category_str_id);

    console.log('Database state:', db);
    res.status(201).json({ id: category_str_id });
});

app.post('/option-categories/:category_str_id/choices', (req, res) => {
    const { category_str_id } = req.params;
    const { choice_str_id, name, price_delta } = req.body;

    const category = db.optionCategories[category_str_id];
    if (!category) {
        return res.status(404).json({ error: 'Category not found.' });
    }

    const newChoice = {
        id: choice_str_id,
        name,
        price_delta: price_delta || 0,
    };

    db.optionChoices[choice_str_id] = newChoice;
    category.choices.push(choice_str_id);

    console.log('Database state:', db);
    res.status(201).json({ id: choice_str_id });
});

app.post('/product-templates/:template_str_id/compatibility-rules', (req, res) => {
    const { template_str_id } = req.params;
    const rule = req.body;

    const template = db.productTemplates[template_str_id];
    if (!template) {
        return res.status(404).json({ error: 'Template not found.' });
    }

    template.compatibility_rules.push(rule);
    console.log('Database state:', template);
    res.status(201).json({ message: 'Compatibility rule added successfully.' });
});

app.post('/product-templates/:template_str_id/available-options/:target_category_str_id', (req, res) => {
    res.status(501).json({ error: 'Endpoint not implemented yet.' });
});

app.post('/product-templates/:template_str_id/validate-configuration', (req, res) => {
    res.status(501).json({ error: 'Endpoint not implemented yet.' });
});

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
