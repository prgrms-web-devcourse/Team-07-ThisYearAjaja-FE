'use client';

import { Icon } from '@/components';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import './index.scss';

type optionsType = {
  value: number;
  name: string;
};

interface DropdownProps {
  options: optionsType[];
  selectedValue: number;
  setSelectedValue: (newSelectedValue: number) => void;
  classNameList?: string[];
}

export default function Dropdown({
  options,
  selectedValue,
  setSelectedValue,
  classNameList = [],
}: DropdownProps) {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  const handleClickLabel = () => {
    setIsDropdownOpened(!isDropdownOpened);
  };

  const handleClickOptionItem = (newSelectedValue: number) => {
    setSelectedValue(newSelectedValue);
    setIsDropdownOpened(false);
  };

  const selectedOptionName = (selectedValue: number) => {
    const selectedOption = options.find(
      (option) => option.value === selectedValue,
    );

    return selectedOption ? selectedOption.name : undefined;
  };

  return (
    <div
      className={classNames('dropdown__container', classNameList)}
      ref={backgroundRef}>
      <input
        id="dropdown"
        className="dropdown__checkbox"
        type="checkbox"
        checked={isDropdownOpened}
      />
      <label
        className="dropdown__label"
        htmlFor="dropdown"
        onClick={handleClickLabel}>
        <div className="dropdown__label__text">
          {selectedOptionName(selectedValue)}
        </div>
        <Icon
          size="4xl"
          name={isDropdownOpened ? 'DROP_UP' : 'DROP_DOWN'}
          color="primary"
          classNameList={['dropdown__label__icon']}
        />
      </label>

      <div className="dropdown__content">
        <ul className="dropdown__content__list">
          {options.map((option) => {
            return (
              <li
                className="dropdown__content__item"
                key={option.value}
                onClick={() => {
                  handleClickOptionItem(option.value);
                }}>
                {option.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
