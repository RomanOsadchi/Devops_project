import {
  Injectable,
  PipeTransform,
  // ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { z } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodTypeAny) {}

  transform(
    value: any,
    // metadata: ArgumentMetadata
  ) {
    try {
      this.schema.parse(value);
      return value;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error?.errors);
    }
  }
}
