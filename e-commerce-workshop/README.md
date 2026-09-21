# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## --------------------------------------------------
mkdir src\app src\components src\pages src\redux src\services && type nul > src\app\store.js && type nul > src\components\Navbar.jsx && type nul > src\components\ProductCard.jsx && type nul > src\components\Loader.jsx && type nul > src\components\ProtectedRoute.jsx && type nul > src\pages\Login.jsx && type nul > src\pages\Signup.jsx && type nul > src\pages\Home.jsx && type nul > src\pages\Products.jsx && type nul > src\pages\ProductDetails.jsx && type nul > src\pages\Cart.jsx && type nul > src\pages\Checkout.jsx && type nul > src\pages\Payment.jsx && type nul > src\pages\OrderSuccess.jsx && type nul > src\pages\Orders.jsx && type nul > src\redux\authSlice.js && type nul > src\redux\cartSlice.js && type nul > src\redux\orderSlice.js && type nul > src\services\api.js && type nul > src\App.jsx && type nul > src\main.jsx && type nul > src\index.css

npm install react-router-dom
