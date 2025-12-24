"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[500px] pt-[1000px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Experience the Magic of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Christmas Wishes
              </span>
            </h1>
          </>
        }
      >
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-christmasGreen to-christmasRed p-8">
          <div className="text-center">
            <div className="text-6xl mb-8">🎄</div>
            <p className="text-xl text-white">Scroll to begin your Christmas journey</p>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}