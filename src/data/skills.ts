// Non-translatable skills data, read from the committed content snapshot.
// Category titles are translated; technology names are proper nouns and are not.

export type TechIcon = {
  name: string
  icon: string
}

export type SkillCategoryData = {
  id: string
  icon: string
  color: string
  skills: string[]
}

export { frontendTech, backendTech, devopsTech, skillCategories } from '@/content/snapshot'
