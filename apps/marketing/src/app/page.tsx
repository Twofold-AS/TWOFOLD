import { Hero } from "@twofold/blocks";
import { Badge } from "@twofold/ui";

export default function Page() {
  return (
    <main>
      <Hero
        eyebrow="Hello Worlds!"
        title="Build faster with Twofold"
        description="Reusable blocks wired into your apps. This is the Hero block rendered from packages/blocks."
        primaryCta={{ label: "Hello!", href: "#hello" }}
        secondaryCta={{ label: "Hei!", href: "#hei" }}
        align="center"
        vAlign="bottom"
        image={{
          src: "/images/hero.jpg",
          alt: "",
          asBackground: false,
          fit: "fill",
          position: "right",
        }}
        imagePlacement="left"
      />
    </main>
  );
}
