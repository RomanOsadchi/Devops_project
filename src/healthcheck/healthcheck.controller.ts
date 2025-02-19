import { Controller, Get } from "@nestjs/common";

import { ApiResponse } from "@nestjs/swagger";

@Controller("healthz")
export class HealthcheckController {
  @Get()
  @ApiResponse({ status: 200, description: "App is alive" })
  healthcheck(): void {}
}
