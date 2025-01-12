<template>
  <div class="space-y-10">
    <div
      class="grid grid-cols-12 gap-4 "
    >
      <div class="col-span-4"></div>
      <div class="col-span-6 flex justify-end space-x-2">
        <DateRangePicker />
        <MembersPicker />
      </div>
      <div class="col-span-2 space-x-2 flex justify-end">
        <Button>Query</Button>
        <Button variant="secondary">Refresh</Button>
      </div>
    </div>

    <!---section 2-->
    <div class="grid grid-cols-9 gap-4 grid-flow-row-dense justify-items-stretch">
      <div class="col-span-2 flex flex-col flex-1">
        <Card>
          <CardHeader>
            <CardTitle>How much time Team spent on</CardTitle>
            <CardDescription>tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <span class="text-5xl font-extrabold">3000</span>
          </CardContent>
          <CardFooter>
            <span><small>Hour(s)</small></span>
          </CardFooter>
        </Card>
      </div>
      <div class="col-span-4 flex flex-col flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Tracking time divided in 3 categories</CardTitle>
            <CardDescription>tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <WidgetsTimetrackingCategory 
                :category1="45" 
                :category2="25" 
                :category3="30"
                class="h-24"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div class="col-span-1 ">
        <Card>
          <CardHeader>
            <CardTitle>Billable</CardTitle>
            <CardDescription>tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <span class="text-5xl font-bold">150</span>
          </CardContent>
          <CardFooter>
            <span><small>Hour(s)</small></span>
          </CardFooter>
        </Card>
      </div>
      <div class="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Internal</CardTitle>
            <CardDescription>tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <span class="text-5xl font-bold">50</span>
          </CardContent>
          <CardFooter>
            <span><small>Hour(s)</small></span>
          </CardFooter>
        </Card>
      </div>
      <div class="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Non-Billable</CardTitle>
            <CardDescription>tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <span class="text-5xl font-bold">100</span>
          </CardContent>
          <CardFooter>
            <span><small>Hour(s)</small></span>
          </CardFooter>
        </Card>
      </div>
    </div>

    <div>&nbsp;</div>
    
    <!---section 3-->
    <div class="space-y-5">
      Tanstack table 
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>