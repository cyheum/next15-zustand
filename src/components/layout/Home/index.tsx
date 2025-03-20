'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Slider } from '@/components';
import { useHomeStore } from '@/store';
import { rexName } from '@/utils';

interface IFormInput {
  firstName: string;
  gender: string;
}

export const HomeContainer: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<IFormInput>({
    mode: 'all',
  });
  const { errors } = formState;
  const { count, actions } = useHomeStore();
  const styles = {
    container: 'm-5',
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  console.log(formState);

  return (
    <>
      {/* <BottomSheet noCloseButton title="test">
        <div className="h-[5rem] w-full" />
      </BottomSheet> */}
      <main className={styles.container}>
        Count: {count} <br />
        <Button type="black" onClick={() => actions.setCount(count + 1)}>
          카운트 올리기
        </Button>
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
        <div className="pt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-[10]">First Name</label>
            <input
              {...register('firstName', {
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
        </div>
      </main>
    </>
  );
};
