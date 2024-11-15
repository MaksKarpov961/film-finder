import s from './ErrorMessage.module.css';
const ErrorMessage = ({ type }) => {
  return (
    <div className={s.error}>
      {type === '404' && <h2>Error 404</h2>}
      {type !== '404' && <h2>Error</h2>}
    </div>
  );
};

export default ErrorMessage;
