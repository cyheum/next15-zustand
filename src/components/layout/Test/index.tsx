'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button as CustomButton, Slider } from '@/components';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/shadcn';
import { useHomeStore } from '@/store';
import { DOMAIN, rexName } from '@/utils';
// import { rexName } from '@/utils';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: '2글자 이상 입력해주세요.' })
    .regex(rexName, { message: '가능한 문자: 영문 대소문자, 숫자' }),
  email: z.email({ message: '유효한 이메일 주소를 입력해주세요.' }),
  message: z
    .string()
    .max(500, { message: '메시지는 최대 500자까지 입력 가능합니다.' }),
});

export const TestContainer: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  const { formState } = form;
  // const { errors } = formState;
  const { fetch, count, actions, isLoading } = useHomeStore();
  const router = useRouter();
  const styles = {
    container: 'm-5',
  };

  const isButtonOn = formState.isValid;

  console.log(formState);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    actions.setIsLoading({ ...isLoading, main: true });
    try {
      const { data } = await axios.post(`${DOMAIN}/api/auth/token`, {
        username: values.name,
        password: values.email,
      });
      const ONE_YEAR = 60 * 60 * 24 * 365;
      setCookie('accessToken', data?.access, {
        maxAge: ONE_YEAR,
        expires: new Date(Date.now() + ONE_YEAR * 1000),
      });
      fetch.getMe();
      if (typeof window !== 'undefined') {
        const prevUrl = sessionStorage.getItem('prevUrl');
        if (prevUrl) {
          sessionStorage.removeItem('prevUrl');
          router.push(prevUrl);
        } else {
          router.push('/');
        }
      } else {
        router.push('/');
      }
      toast.success('로그인 성공!');
    } catch (error) {
      console.error(error);
      toast.error('로그인에 실패했습니다.\n아이디와 비밀번호를 확인해주세요.');
    }
    actions.setIsLoading({ ...isLoading, main: false });
    try {
      // Simulate a successful contact form submission
      console.log(values);
    } catch (error) {
      console.error('Error submitting contact form', error);
      toast.error('Failed to send your message. Please try again.');
    }
  };

  return (
    <>
      {/* <BottomSheet noCloseButton title="test">
        <div className="h-[5rem] w-full" />
      </BottomSheet> */}
      <main className={styles.container}>
        Count: {count} <br />
        <CustomButton type="black" onClick={() => actions.setCount(count + 1)}>
          카운트 올리기
        </CustomButton>
        <Slider
          //@ts-expect-error
          containerStyle={{ '--swiper-pagination-bottom': '50px' }}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
        />
        {/* <div className="pt-10">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <label className="block mb-[10]">First Name</label>
            <input
              {...form.register('firstName', {
                required: '닉네임을 입력해주세요',
                minLength: { value: 2, message: '2글자 이상 입력해주세요' },
                maxLength: { value: 8, message: '최대 8글자입니다.' },
                pattern: {
                  // input의 정규식 패턴
                  value: rexName,
                  message: '가능한 문자: 영문 대소문자, 숫자', // 에러 메세지
                },
              })}
              className="block border border-solid rounded-sm mb-[10]"
              aria-invalid={errors.firstName ? 'true' : 'false'}
            />
            <p className="text-red-600" role="alert">
              {errors.firstName?.message ?? ''}
            </p>
            <label className="block mb-[10]">Gender Selection</label>
            <select
              {...register('gender')}
              className="block border border-solid rounded-md p-[4] mb-[10]"
            >
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
            <button className="border border-solid rounded-[10] px-[1rem] py-[0.5rem]">
              제출
            </button>
          </form>
        </div> */}
        <Card className="mt-[4rem] mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Us</CardTitle>
            <CardDescription>
              Please fill out the form below and we will get back to you
              shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid gap-4">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            type="text"
                            autoComplete="name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="johndoe@mail.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="message">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            id="message"
                            placeholder="Your message..."
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isButtonOn}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
};
