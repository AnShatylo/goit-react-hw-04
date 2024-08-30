import { ThreeDots } from 'react-loader-spinner';

import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.spinner}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#02042e"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}
