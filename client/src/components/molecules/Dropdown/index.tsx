import React, { useRef, useState } from 'react';
import { DropdownList, StyledInput, TStyle, Wrapper } from './style';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (arg: string) => void;
  dropdownStyle?: TStyle;
  items?: string[];
  margin?: string;
}

const Dropdown: React.FC<IProps> = ({ onValueChange, dropdownStyle = 'normal', items = [], margin = '0', ...props }) => {
  const activatorRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickDropdown = () => setIsOpen(!isOpen);
  const handleClickItem = (value: string) => {
    if (activatorRef.current) {
      activatorRef.current.value = value;
    }
    if (onValueChange) {
      onValueChange(value);
    }
    setIsOpen(false);
  };
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (listRef.current!.contains(target) || activatorRef.current!.contains(target)) {
      return;
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Wrapper margin={margin}>
      <StyledInput dropdownStyle={dropdownStyle} onClick={handleClickDropdown} ref={activatorRef} {...props} readOnly={true} />
      <DropdownList dropdownStyle={dropdownStyle} visible={isOpen} ref={listRef}>
        {items.map((item, idx) => (
          <li key={idx} onClick={() => handleClickItem(item)}>
            {item}
          </li>
        ))}
      </DropdownList>
    </Wrapper>
  );
};

export default Dropdown;
