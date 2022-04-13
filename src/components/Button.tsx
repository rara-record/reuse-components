import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

interface IProps extends React.HTMLAttributes<HTMLElement> {
  color: string;
  size: string;
  outline: boolean;
  fullWidth: boolean;
}

interface themeProps {
  outline: boolean;
}

const Button = (props: IProps) => {
  const { children, color, size, outline, fullWidth, ...rest } = props;
  console.log(props);
  return (
    <StyledButton
      {...rest}
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

Button.defaultProps = {
  color: 'blue',
  size: 'medium',
  outline: false,
  fullWidth: false,
};

const colorStyles = css<{ color: string; outline: boolean }>`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${(props: themeProps) =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

const sizes = {
  large: {
    height: '3rem',
    fontSize: '1.25rem',
  },
  medium: {
    height: '2.25rem',
    fontSize: '1rem',
  },
  small: {
    height: '1.75rem',
    fontSize: '0.875rem',
  },
};

const sizeStyles = css<{ size: string }>`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const fullWidthStyle = css<{ fullWidth: boolean }>`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;

      &:not(:first-child) {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

const StyledButton = styled.button<{
  color: string;
  size: string;
  outline: boolean;
  fullWidth: boolean;
}>`
  /* 공통 스타일 */
  display: inline-flex;
  padding: 0 1rem;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;

  /* 크기 */

  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  /* 기타 */
  ${(props) =>
    !props.fullWidth &&
    css`
      & + & {
        margin-left: 1rem;
      }
    `}

  /* width 100% 버튼 스타일 */
  ${fullWidthStyle}
`;
