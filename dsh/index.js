/**
 * luna-sincerity-lens —— 鲸鱼娘（Luna）自写技能型 dsh 插件。
 * 用干货与诚意标准筛选和推荐内容的方法论
 *
 * 模式同 dsh-arch-doc：注册自带的 skills/ 目录为技能根（includeDefaultRoots: false
 * 防与宿主技能根重复）。零构建，ESM 由 harness 直接加载。
 */
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { FileSystemSkillProvider } from '@deepseek-ai/dsh-skill-filesystem'

export const name = 'luna-sincerity-lens'
export const inject = ['skills']

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const skillsDir = join(rootDir, 'skills')

export function apply(ctx, config = {}) {
  let provider
  ctx.skills.registerProvider((control) => {
    provider = new FileSystemSkillProvider(ctx, control, {
      providerName: 'luna-sincerity-lens',
      includeDefaultRoots: false,
      customSkillDirs: [skillsDir],
      ...config,
    })
    return provider
  })
  ctx.effect(
    function* () {
      yield async () => {
        await provider?.dispose()
      }
    },
    'luna-sincerity-lens skill provider',
  )
}
