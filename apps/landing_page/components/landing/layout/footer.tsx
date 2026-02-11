"use client";

import { Trans } from "@lingui/react/macro";
import { Instagram, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-[#1C1917] text-white relative overflow-hidden" role="contentinfo">
      <div className="absolute -top-20 left-0 right-0 h-60 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#A43F20] via-[#B54526] via-[#1A1614] to-[#1C1917]" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute -top-20 -bottom-0 left-0 right-0 bg-gradient-to-b from-[#1C1917] via-[#1A1614] to-[#161412]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 md:px-8 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#C6502B] to-[#A84423] rounded-xl flex items-center justify-center">
                <span className="text-white font-display text-lg font-semibold">C</span>
              </div>
              <span className="font-display text-xl text-white">Cookmate</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              <Trans>All your recipes, finally in one place.</Trans>
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">
              <Trans>Product</Trans>
            </h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  <Trans>Features</Trans>
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  <Trans>Pricing</Trans>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  <Trans>Mobile app</Trans>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">
              <Trans>Resources</Trans>
            </h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  <Trans>Help center</Trans>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  <Trans>Blog</Trans>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  <Trans>Contact</Trans>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">
              <Trans>Legal</Trans>
            </h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  <Trans>Privacy</Trans>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  <Trans>Terms of Use</Trans>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  <Trans>Legal notice</Trans>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            <Trans>© 2025 Cookmate. All rights reserved.</Trans>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Twitter className="w-4 h-4 text-white/50" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Instagram className="w-4 h-4 text-white/50" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Mail className="w-4 h-4 text-white/50" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
