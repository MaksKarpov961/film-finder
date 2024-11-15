import { ColorRing, MagnifyingGlass } from 'react-loader-spinner';
import s from './Loader.module.css';
const Loader = ({ type }) => {
  return (
    <div className={s.loader}>
      {type === 'colorRing' && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      {type === 'magnifyingGlass' && (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      )}
    </div>
  );
};

export default Loader;
