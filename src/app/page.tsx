'use client';
import { useState } from 'react';
import styles from './page.module.css';
import MonsterForm from './components/MonsterForm';

export default function Home() {
  const [formData, setFormData] = useState({ description: '', attribute: '' });

  const handleFormSubmit = (description: string, attribute: string) => {
    setFormData({ description, attribute });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Ai Monster Generator</h1>
        <MonsterForm onSubmit={handleFormSubmit} />
      </main>
    </div>
  );
}
