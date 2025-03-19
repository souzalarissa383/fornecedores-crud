import styled, { keyframes, css } from "styled-components";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

interface NotificationProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}

const NotificationContainer = styled.div<{ $type: "success" | "error"; $isVisible: boolean }>`
  padding: 10px;
  margin: 10px 0;
  background-color: ${({ $type }) => ($type === "success" ? "#4AC0FF" : "#f91919")};
  color: white;
  border-radius: 4px;
  text-align: center;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-out;

  ${({ $isVisible }) =>
    !$isVisible &&
    css`
      animation: ${fadeOut} 0.5s ease-out;
    `}
`;

export const Notification: React.FC<NotificationProps> = ({ message, type, isVisible }) => {
  return (
    <NotificationContainer $type={type} $isVisible={isVisible}>
      {message}
    </NotificationContainer>
  );
};
