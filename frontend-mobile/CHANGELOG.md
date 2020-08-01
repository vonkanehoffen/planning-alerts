# 0.0.1

Super sketchy first release!
Everything's un-styled, auth is slow, no on-boarding etc. What does work:

- Sign in via Auth0
- Setting user location from device
- Querying planning data from GraphQL back end
- Plotting it on a map & showing details
- Push notifications from weekly council lists

# 0.0.2

- Better map handling
- Pretty main screen layouts
- Better loading and error indicators
- Bottom drawer nav
- FCM tokens stored by unique device ID
- Bootsplash screen
- New permissions being requested for reasons I'm not entirely sure:
  android.permission.READ_PHONE_STATE android.permission.WRITE_EXTERNAL_STORAGE

# 0.0.3

- Better caching of geospatial queries
- Dark green color scheme
- Council setting screen
- Focus on new planning apps when opened from alert (maybe... this could still be broken)

# 0.0.4

- User alert states stored in Hasura backend to get round FCM unreliability
- Like, pretty much definitely zooms the map to those new PAs this time.
- Revised home and close button
