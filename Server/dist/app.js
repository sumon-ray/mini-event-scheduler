"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const events_routes_1 = require("./app/modules/events/events.routes");
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check route
app.get("/", (_req, res) => {
    res.send("🎉 Mini Event Scheduler API is running!");
});
app.use("/api/events", events_routes_1.EventRouter);
app.use(notFound_1.default);
app.use(globalErrorhandler_1.default);
// Event routes
exports.default = app;
