import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const BlockModel: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <script 
        type="module" 
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
        class={displayClass}
      ></script>
    )
  }

  return BlockModel
}) satisfies QuartzComponentConstructor