import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const BlockModel: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <script src="https://cdn.jsdelivr.net/npm/minecraft-model-viewer@latest/dist/minecraft-model-viewer.min.js"></script>
    )
  }

  return BlockModel
}) satisfies QuartzComponentConstructor