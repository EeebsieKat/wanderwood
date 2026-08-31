import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import BlockModel from "./quartz/components/BlockModel"

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
