import styled from "styled-components";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const NotificationContainer = styled.div<{ type: "success" | "error" }>`
  padding: 10px;
  margin: 10px 0;
  background-color: ${({ type }) => (type === "success" ? "#4AC0FF" : "#f91919")}; /* Azul claro para sucesso e Cinza claro 2 para erro */
  color: white;
  border-radius: 4px;
  text-align: center;
`;

export const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return <NotificationContainer type={type}>{message}</NotificationContainer>;
};