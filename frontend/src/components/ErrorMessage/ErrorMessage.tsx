import './ErrorMessage.css';

interface ErrorMessageComponentProps {
  message: string;
}

const ErrorMessageComponent = ({ message }: ErrorMessageComponentProps) => {
  return (
    <div className="error-message" role='alert'>
      <span>An error has occurred: </span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessageComponent;