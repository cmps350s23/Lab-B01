import Image from 'next/image'
import styles from './page.module.css'
import * as repo from '@/app/api/publishers/publishers-repo'
import Link from 'next/link';

export default async function Home() {
  const publishers = await repo.getPublishers()
  return (
    <>CMPS 312 Final Exam - Good Luck</>
  )
}
