import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  Typography
} from '@mui/material'
import ProductQuantity from '../model/ProductQuantity'
import { Delete } from '@mui/icons-material'
import generalConfig from '../config/generalConfig.json'

interface Props {
  cartItem: ProductQuantity
  dividerBefore?: boolean
  deleteItemFn: (id: string) => void
  onClickFn: () => void
}

const CartItem: React.FC<Props> = ({
  cartItem,
  dividerBefore = false,
  deleteItemFn,
  onClickFn
}) => {
  return (
    <>
      {dividerBefore && <Divider />}
      <ListItem
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', cursor: 'pointer' }} onClick={onClickFn}>
          <Avatar
            sx={{ width: 48, height: 48, mr: 2 }}
            src={cartItem.imgLinks[0]}
            alt={cartItem.name}
          />
          <div>
            <Typography variant='h6'>{cartItem.name}</Typography>
            <Typography variant='body2'>{cartItem.category}</Typography>
          </div>
        </div>
        <div
          style={{
            marginInlineStart: 'auto',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div>
            <Typography>Price: {cartItem.price} {generalConfig.currency}</Typography>
          </div>

          <IconButton onClick={() => deleteItemFn(cartItem.id!)}>
            <Delete color='warning' />
          </IconButton>
        </div>
      </ListItem>
    </>
  )
}

export default CartItem
