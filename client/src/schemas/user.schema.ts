import { z as zod } from 'zod';

const userSchema = zod.object({
  fullname: zod.string().min(1, { message: 'Trường này là bắt buộc' }),
  email: zod.string().min(1, { message: 'Trường này là bắt buộc.' }).email('This is not a valid email.'),
  avatar: zod.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  phone: zod
    .string()
    .optional()
    .refine((value) => !value || /^[0-9]+$/.test(value), { message: 'Số điện thoại không đúng định dạng' })
  // .refine(async (e) => {
  // return await checkIfEmailIsValid(e);
  // }, 'This email is not in our database')
});

export default userSchema;
export type IUserSettingSchemaType = zod.infer<typeof userSchema>;
