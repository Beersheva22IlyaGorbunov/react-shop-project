import Category from '../model/Category'

export default interface CategoryService {
  getCategories: () => Promise<Category[]>
  addCategory: (category: Category, image?: File) => Promise<Category>
  updateCategory: (category: Category, image?: File) => Promise<Category>
  deleteCategory: (id: string) => Promise<void>
}
