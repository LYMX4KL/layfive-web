import HomePage from "@/components/HomePage";

export const metadata = {
  title: "LayFive — 五行轮盘系统",
  description:
    "LayFive 不是一个赢钱系统。它是一套有结构的纪律方法，帮助邮轮玩家延长资金寿命、获得免费回赠、把轮盘变成社交娱乐。包含金、木、水、火、土五种 18 号布局。",
};

export default function Page() {
  return <HomePage locale="zh" />;
}
