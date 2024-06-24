import { Box, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { NavigationItemType } from '../../types/navigation'


type SidebarButtonProps = {
    navigation: NavigationItemType
    pathname: string
}


export const SidebarButton = ({ navigation, pathname }: SidebarButtonProps) => {
    const router = useRouter()

    const handleNavigate = () => {
        router.push({
            pathname: navigation.path || "/"
        })
    }

    return (
        <Box width="100%" p={1} >
            <Box overflow="hidden" borderRadius={3}>
                <ListItemButton component="a" onClick={handleNavigate} >
                    <ListItemIcon> {navigation.icon && navigation.icon}</ListItemIcon>
                    <ListItemText>
                        <Typography variant='body2' fontSize={13}>
                            {navigation.label}
                        </Typography>
                    </ListItemText>
                </ListItemButton>
            </Box>
        </Box>

    )
}