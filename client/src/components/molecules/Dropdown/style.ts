import styled from '@emotion/styled';
import { common } from 'styles';

export type TStyle = 'small' | 'normal' | 'large';

interface IStyleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  dropdownStyle: TStyle;
  visible?: boolean;
}

export const Wrapper = styled.div<{ margin: string }>`
  position: relative;
  margin: ${({ margin }) => margin};
`;

export const StyledInput = styled.input<IStyleProps>`
  all: unset;

  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid ${({ theme }) => theme.color.bgWhite};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.bgWhite};
  font-weight: bold;
  cursor: pointer;

  :focus {
    border: 1.5px solid ${({ theme }) => theme.color.primary2};
  }

  ${({ dropdownStyle }) => styleOptions[dropdownStyle]}
`;

export const DropdownList = styled.ul<IStyleProps>`
  ${({ theme }) => theme.shadow};

  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  background-color: ${({ theme }) => theme.color.gray4};
  margin-top: 0.2 rem;
  max-height: 8rem;
  overflow-y: auto;
  ${({ theme }) => theme.customScrollbar.primary1}
  z-index: 1;

  li {
    ${({ dropdownStyle }) => styleOptions[dropdownStyle]}
    width: 100%;
    margin: 0.2rem 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      color: white;
      background-color: ${({ theme }) => theme.color.primary1};
    }
  }
`;

const styleOptions: { [key in TStyle]: string } = {
  small: `
      padding: 0.1rem 0.5rem;
      font-size: ${common.fontSize.small};
    `,
  normal: `
      padding: 0.5rem 0.5rem;
      font-size: ${common.fontSize.normal};
    `,
  large: `
      padding: 0.6rem 0.5rem;
      font-size: ${common.fontSize.large};
    `,
};
