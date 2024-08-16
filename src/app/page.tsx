'use client';
import { useState } from 'react';
import styles from './page.module.css';
import MonsterForm from './components/MonsterForm';
import fetchMonsterImg from './lib/getImgApi';
import Image from 'next/image';
import Loading from 'react-loading';

export default function Home() {
  const [formData, setFormData] = useState({ description: '', attribute: '' });
  const [monsterImg, setMonsterImg] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (description: string, attribute: string) => {
    setIsLoading(true);
    setFormData({ description, attribute });
    const imageUrl: string = await fetchMonsterImg({ description, attribute });
    setMonsterImg(imageUrl);
    setIsLoading(false);
  };

  const handleTwitterShare = () => {
    const shareUrl = encodeURIComponent(monsterImg);
    const twitterText = encodeURIComponent(
      `ついに発見！ ${formData.description} ${formData.attribute}タイプの新しいモンスター！？ 😆 \n #モンスター画像生成`
    );
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${shareUrl}`;
    window.open(twitterUrl, '_blank');
  };

  const LoadingSection = () => (
    <>
      <Loading
        type="spinningBubbles"
        color="#0070f3"
        height={100}
        width={100}
      />
    </>
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Ai Monster Generator</h1>
        <MonsterForm
          onSubmit={handleFormSubmit}
          isGeneratedMonsterImg={!!monsterImg}
        />
        <div className={styles.imageContainer}>
          {isLoading ? (
            <LoadingSection />
          ) : (
            monsterImg && (
              <>
                <Image
                  src={monsterImg}
                  alt="生成されたモンスターの画像"
                  className={styles.monsterImage}
                  width={300}
                  height={300}
                />
                <button
                  className={styles.shareButton}
                  onClick={handleTwitterShare}
                >
                  X（旧Twitter）にシェアする
                </button>
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
}
