import { z as zod } from 'zod';

const baseSchema = {
  emailOrPhone: zod
    .string()
    .min(1, { message: 'Trường này là bắt buộc' })
    .refine(
      (value: string) => {
        const isPhoneNumber = /^[0-9]+$/.test(value);
        const isEmail = /\S+@\S+\.\S+/.test(value);
        return isPhoneNumber || isEmail;
      },
      {
        message: 'Email hoặc số điện thoại không đúng định dạng'
      }
    ),
  password: zod.string().min(6, { message: 'Mật khẩu cần tối thiểu 6 ký tự' })
};

const loginSchema = zod.object({
  ...baseSchema
});

const registerSchema = zod
  .object({
    ...baseSchema,
    fullname: zod.string().min(1, { message: 'Trường này là bắt buộc' }),
    confirmPassword: zod.string().min(6, { message: 'Mật khẩu cần tối thiểu 6 ký tự' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Nhập lại password không đúng',
    path: ['confirmPassword']
  });

const setupPasswordSchema = zod
  .object({
    password: zod.string().min(6, { message: 'Mật khẩu cần tối thiểu 6 ký tự' }),
    confirmPassword: zod.string().min(6, { message: 'Mật khẩu cần tối thiểu 6 ký tự' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Nhập lại password không đúng',
    path: ['confirmPassword']
  });

export { loginSchema, registerSchema, setupPasswordSchema };
export type ILoginSchemaType = zod.infer<typeof loginSchema>;
export type IRegisterSchemaType = zod.infer<typeof registerSchema>;
export type ISetupPasswordSchemaType = zod.infer<typeof setupPasswordSchema>;
