import React from 'react'
import Image from 'next/image'

const AppPromoSection = () => {
  return (
    <section className={"appPromoSection"}>
      <div className={"container"}>
        <div className={"leftContent"}>
          <div className={"circleOuter"}>
            <div className={"circleMiddle"}>
              <div className={"circleInner"} />
            </div>
          </div>
        </div>
        
        <div className={"rightContent"}>
          <h2 className={"sectionTitle"}>
            Our Petshop at your hand
          </h2>
          
          <h3 className={"appTitle"}>
            Download Our Petshop App
          </h3>
          
          <p className={"appDescription"}>
            Sed sit amet neque faucibus arcu porta commodo. Proin egestas enim
            ac sapien luctus tincidunt. Aliquam diam ligula finibus eget
            faucibus dignissim rhoncus id risus. Cras feugiat elit urna Ut
            sodales massa aliquet.
          </p>
          
          <div className={"appStoreButtons"} />
        </div>
      </div>
    </section>
  )
}

export default AppPromoSection
