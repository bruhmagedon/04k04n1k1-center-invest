import { Outlet } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"

import { CircleUserRound, Copy, ScrollText, Search, SquarePlus } from 'lucide-react';
import { Button } from '@/shared/ui/button';

import { NpaModal } from '@/widgets/NpaModal/NpaModal';
import { HomeHeader } from '@/app/layouts/HomeLayout/components/HomeHeader';
import { LeftSideBar } from '@/app/layouts/HomeLayout/components/LeftSideBar';
export const HomeLayout = () => {
  return (
    //todo: 97vh
    <div className='relative flex  justify-center mx-7.5 mt-7.5 rounded-xl h-[97vh]'>
      <LeftSideBar/>
      <Tabs defaultValue="account" className="w-full bg-[#232325] rounded-r-xl">
      <HomeHeader></HomeHeader>
        
        <Outlet/>
      </Tabs>
      
    </div>
  );
};
