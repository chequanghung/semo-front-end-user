<template>
  <div class="home">
      <UserTitle :user="user"></UserTitle>
      <PageSubtitle :menus="menus"></PageSubtitle>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'UserInfo',
    components: {
        UserTitle: () => import('@/components/User/UserTitle'),
        PageSubtitle: () => import('@/components/PageSubtitle')
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    data() {
        return {
            menus: [
                {
                    url: '/user/info',
                    title: '📝 Thông tin cá nhân'
                },
                {
                    url: '/user/product',
                    title: "📦 Sản phẩm bạn đăng"
                },
                {
                    url: '/user/bid',
                    title: '🛒 Sản phẩm bạn mua'
                },
                {
                    url: '/user/wallet',
                    title: '👛 Ví của bạn'
                }
            ]
        }
    },
    methods: {
    }
}
</script>

<style>

</style>