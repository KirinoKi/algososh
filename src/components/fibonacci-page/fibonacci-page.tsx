import React, { useState } from "react";
import { fibo } from "../../utils/fibo";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import style from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loaderBtn, setLoaderBtn] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<Array<number>>([]);

  const handlerChangeInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = +e.currentTarget.value;
    value > 0 && value < 20 ? setDisabled(false) : setDisabled(true);
    setInput(value);
  };

  const handlerBtnClick = async () => {
    setLoaderBtn(true);
    await fibo(input + 1, setNumbers);
    setLoaderBtn(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.container}>
        <Input
          onChange={handlerChangeInput}
          placeholder="Введите число"
          max={19}
          min={1}
          type={"number"}
          value={input}
          isLimitText
          data-cy="input-fibo"
        />
        <Button
          onClick={handlerBtnClick}
          text="Рассчитать"
          linkedList="small"
          isLoader={loaderBtn}
          disabled={disabled}
          data-cy="btn-fibo"
        />
      </div>
      <div className={style.container__circle}>
        {numbers?.map((number, index) => (
          <Circle letter={`${number}`} key={index} index={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};