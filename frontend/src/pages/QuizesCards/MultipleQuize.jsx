import styles from './styles.module.css';

const MultipleQuize = () => {
  return (
    <div className={styles.card}>
      <div className={styles.question}>
        <p>Question:</p>
        <input type="text" className={styles.inp_qst} />
      </div>
      <div className={styles.container}>
        <p>Answer options: </p>
        <div className={styles.options_container}>
          <textarea type="text" className={styles.inp_opt}></textarea>
          <textarea type="text" className={styles.inp_opt}></textarea>
          <textarea type="text" className={styles.inp_opt}></textarea>
          <textarea type="text" className={styles.inp_opt}></textarea>
        </div>
      </div>
      <div className={styles.btns}>
        <button className={styles.btn}>add new option</button>
        <button className={styles.btn}>delete</button>
      </div>
      <div className={styles.grades}>
        <p>Points per question: </p>
        <input type="number" className={styles.points} />
      </div>
      <button className={styles.save}>save</button>
    </div>
  );
};

export default MultipleQuize;
