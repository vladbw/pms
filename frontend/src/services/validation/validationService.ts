export type ValidationSchema<T> = Record<
  keyof T,
  (value: unknown) => string | null
>;
export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export class ValidationService {
  static validate<T extends object>(
    data: T,
    schema: ValidationSchema<T>,
  ): ValidationErrors<T> {
    const errors: ValidationErrors<T> = {};

    for (const key of Object.keys(schema) as Array<keyof T>) {
      const ruleCallback = schema[key];
      const error = ruleCallback(data[key]);
      if (error) {
        errors[key] = error;
      }
    }

    return errors;
  }

  static hasErrors<T>(errors: ValidationErrors<T>): boolean {
    return Object.keys(errors).length > 0;
  }

  static validateFile(file: File | null): string | null {
    if (!file) {
      return null;
    }
    // Not meant to be an exhaustive list of supported image types, just a base safeguard against malicious uploads 
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return "Only JPEG, PNG and WebP images are supported!";
    }
    if (file.size > 3 * 1024 * 1024) {
      return "Image needs to be smaller than 3MB.";
    }
    return null;
  }
}
