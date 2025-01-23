export interface User {
    id: number
    name: string
    image?: string
    email?: string
    status?: 'online' | 'offline' | 'away'
  }
  
  export interface AvatarProps {
    user: User
    size?: 'sm' | 'md' | 'lg'
    showStatus?: boolean
  }
  
  export interface AvatarGroupProps {
    users: User[]
    limit?: number
    size?: 'sm' | 'md' | 'lg'
    showStatus?: boolean
  }
  
  