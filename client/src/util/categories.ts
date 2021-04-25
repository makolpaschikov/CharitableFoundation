export enum Category {
    NONE = 'none',

    INTERIOR = 'INTERIOR',
    MEDICINES = 'MEDICINES',
    TECHNICS = 'TECHNICS',
    OTHER = 'OTHER',
}

export const CategoryName: Record<Category, string> = {
    [Category.NONE]: '—',
    [Category.INTERIOR]: 'Мебель',
    [Category.TECHNICS]: 'Техника',
    [Category.MEDICINES]: 'Лекарства',
    [Category.OTHER]: 'Другое',
}
