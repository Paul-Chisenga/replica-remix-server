import type { FC } from "react";
import type { MenuWithProducts } from "~/utils/types";
import ShopItem from "../shop/ShopItem";
import Tab from "../Tab/Tab";

interface Props {
  menu: MenuWithProducts[];
}

const Menu1: FC<Props> = ({ menu }) => {
  return (
    <div className="Shop-pages pt-120 mb-120">
      <div className="container">
        <Tab.Wrapper>
          <Tab.Header.Wrapper
            id="menutTabHeader"
            className="tw-sticky tw-top-0 tw-z-20 tw-bg-white tw-border-gray-50"
          >
            {menu.map((m, idx) => (
              <Tab.Header.Item
                key={m.id}
                id={"s" + m.id}
                defaultSelected={idx === 0}
              >
                {m.title}
              </Tab.Header.Item>
            ))}
          </Tab.Header.Wrapper>
          <Tab.Content.Wrapper id="menutTabContent" className="mt-50">
            {menu.map((m, idx) => (
              <Tab.Content.Item
                key={m.id}
                id={"s" + m.id}
                defaultSelected={idx === 0}
              >
                <div className="row g-4">
                  {m.products.map((prod) => (
                    <div className="col-lg-4 col-md-6 " key={prod.id}>
                      <ShopItem product={prod} />
                    </div>
                  ))}
                </div>
              </Tab.Content.Item>
            ))}
          </Tab.Content.Wrapper>
        </Tab.Wrapper>
      </div>
    </div>
  );
};

export default Menu1;
