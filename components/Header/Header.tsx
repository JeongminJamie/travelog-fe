'use client';

import classNames from 'classnames/bind';
import styles from './Header.module.css';

import Image from 'next/image';
import account from '../../assets/account.png';
import chat from '../../assets/chat.png';
import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { noLayoutRoutes } from '@/lib/constants';

//현재 페이지가 explore의 페이지일때 active classname 만들어서 색상 주기

const cx = classNames.bind(styles);

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const noLayout = noLayoutRoutes.includes(pathname);
  if (noLayout) return <></>;

  const [isAccountDropOpen, setIsAccountDropOpen] = useState<boolean>(false);
  const accountDropRef = useRef<HTMLDivElement>(null);

  // account 아이콘 dropdown이 열려있을 때, 아무 데나 누르면 다시 닫히게 하는 로직
  useEffect(() => {
    const hideDropWhenClickAnywhere: EventListener = (event) => {
      if (
        isAccountDropOpen &&
        accountDropRef.current &&
        !accountDropRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.account-icon')
      ) {
        setIsAccountDropOpen(false);
      }
    };

    if (isAccountDropOpen) {
      document.addEventListener('mousedown', hideDropWhenClickAnywhere);
    } else {
      document.removeEventListener('mousedown', hideDropWhenClickAnywhere);
    }

    return () => {
      document.removeEventListener('mousedown', hideDropWhenClickAnywhere);
    };
  }, [isAccountDropOpen]);

  return (
    <div className={cx('Header')}>
      <div className={cx('company-container')}>
        <div className={cx('company-logo')} onClick={() => router.push("/")}>Travel Buddy</div>
      </div>
      <div className={cx('navigatation-user-container')}>
        <div
          className={cx('header-nav', {
            'header-home-active': pathname === '/',
          })}
          onClick={() => router.push('/')}
        >
          Home
        </div>
        <div className={cx('header-nav', {'header-explore-active': pathname === "/post-view"})} 
        onClick={()=> router.push("/post-view")}>Explore</div>
        <button className={cx('login-button')} onClick={() => router.push('/login')}>
          로그인
        </button>
        <button className={cx('signup-button')} onClick={() => router.push('/verify-phone')}>
          회원 가입
        </button>
        <Image
          className={cx('account-icon')}
          src={account}
          alt="account-icon"
          onClick={() => setIsAccountDropOpen((prev) => !prev)}
        />
        {isAccountDropOpen && (
          <div className={cx('account-dropbox')} ref={accountDropRef}>
            <div
              className={cx('dropbox-div')}
              onClick={() => {
                setIsAccountDropOpen((prev) => !prev);
                router.push('/my-page');
              }}
            >
              마이 페이지
            </div>
            <div className={cx('dropbox-div')}>로그아웃</div>
          </div>
        )}
        <Image className={cx('chat-icon')} src={chat} alt="chat-icon" onClick={() => router.push('/chat-room-list')} />
      </div>
    </div>
  );
};

export default Header;
