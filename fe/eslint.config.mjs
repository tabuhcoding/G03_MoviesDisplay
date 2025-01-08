import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/**/*.js", "src/**/*.ts", "src/**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // Cảnh báo khi bỏ quá 1 dòng trống liên tiếp
      "no-multiple-empty-lines": ["warn", { max: 1, maxEOF: 0, maxBOF: 0 }],
      // Cảnh báo khi có dấu phẩy cuối cùng trong array, object, ...
      "comma-dangle": ["warn", "never"],
      // Cảnh báo nếu tab width không phải 2 hoặc indent không đúng
      "indent": ["warn", 2],
      // Cảnh báo khi khai báo biến mà không sử dụng
      "no-unused-vars": ["warn", { vars: "all", args: "none", ignoreRestSiblings: false }]
    },
    ignores: [
      ".next/",        // Bỏ qua thư mục next
      "node_modules/", // Bỏ qua thư mục node_modules
      "dist/",         // Bỏ qua thư mục build/dist
      "*.config.js",   // Bỏ qua các tệp cấu hình như webpack.config.js
      "*.test.js",     // Bỏ qua các tệp test
      "*.spec.js",      // Bỏ qua các tệp spec
    ]
  }
];

export default eslintConfig;
