import styles from './Navigation.module.css';

const Navigation = (props: any) => {
  return (
    <header className={styles.mainHeader}>
      <nav>
        <span>{props.title}</span>
      </nav>
    </header>
  );
};

export default Navigation;
