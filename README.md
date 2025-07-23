
# Think41Assessment

A simple Express.js-based API for managing product templates, option categories, and choices, with support for compatibility rules and configuration validation.

## 🚀 Features

- Create product templates with a base price
- Add option categories (e.g., RAM, Storage) to templates
- Add choices (e.g., 8GB RAM, 16GB RAM) with price deltas
- Define compatibility rules (e.g., incompatible or required options)
- (Planned) Validate full configurations and compute final pricing

## 📦 Tech Stack

- Node.js
- Express.js
- In-memory database (for simplicity)

## 📂 Project Structure

├── index.js # Main server file
├── package.json # Project metadata and dependencies



## 🛠 Setup & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/nitishreddy2003/Think41Assessment.git
   cd Think41Assessment
Install dependencies: npm install

Start the server: node index.js

Server will run on: http://localhost:3000

📮 Sample API Requests
1. Create a Product Template

POST /product-templates
Content-Type: application/json

{
  "template_str_id": "laptop_basic",
  "name": "Basic Laptop",
  "base_price": 500
}
2. Add an Option Category

POST /product-templates/laptop_basic/option-categories
Content-Type: application/json

{
  "category_str_id": "ram",
  "name": "RAM"
}
3. Add an Option Choice
POST /option-categories/ram/choices
Content-Type: application/json

{
  "choice_str_id": "ram8gb",
  "name": "8 GB RAM",
  "price_delta": 50
}

<img width="1076" height="807" alt="Screenshot 2025-07-23 215343" src="https://github.com/user-attachments/assets/f304ee6c-0483-4497-a0ca-2a054b16d75d" />

