import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guard/auth.guard.js";

export const Auth = () => applyDecorators(UseGuards(AuthGuard));
