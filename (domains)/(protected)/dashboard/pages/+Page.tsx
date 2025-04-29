import { PinCard } from "@/shared/components/pin-card/pin-card";
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { BarChart3, Clock, Grid, List, MapPin, Plus, Settings, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <ContainerWrapper>
      <div className="grid gap-6 mb-8 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Pins</CardTitle>
            <Grid className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+5 in the last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2k</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Saved</CardTitle>
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4k</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5k</div>
            <p className="text-xs text-muted-foreground">+3.1% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent pins and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                    <img
                      src={`/placeholder.svg?height=48&width=48&text=Pin${i}`}
                      alt={`Pin ${i}`}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Destination #{i}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{i === 1 ? "Just now" : `${i} days ago`}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {i % 2 === 0 ? "Created" : "Updated"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-auto flex-col items-center justify-center py-4 space-y-2">
                <Plus className="w-5 h-5" />
                <span>New Pin</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-center justify-center py-4 space-y-2">
                <List className="w-5 h-5" />
                <span>Collections</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-center justify-center py-4 space-y-2">
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-center justify-center py-4 space-y-2">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Button>
            </div>
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium">Draft a new pin</h3>
              <div className="space-y-2">
                <Input placeholder="Pin title" />
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Create Draft</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Pins</CardTitle>
            <CardDescription>Your most viewed and saved content</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="grid">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="grid">
                    <Grid className="w-4 h-4 mr-2" />
                    Grid
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="w-4 h-4 mr-2" />
                    List
                  </TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <TabsContent value="grid">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <PinCard
                    imageUrl="/placeholder.svg?height=600&width=400"
                    title="Santorini Sunset Views"
                    location="Santorini, Greece"
                    category="Scenic"
                    saves="4.2k"
                  />
                  <PinCard
                    imageUrl="/placeholder.svg?height=800&width=400"
                    title="Tokyo City Lights"
                    location="Tokyo, Japan"
                    category="Urban"
                    saves="3.8k"
                  />
                  <PinCard
                    imageUrl="/placeholder.svg?height=500&width=400"
                    title="Bali Beach Retreat"
                    location="Bali, Indonesia"
                    category="Beach"
                    saves="5.1k"
                  />
                  <PinCard
                    imageUrl="/placeholder.svg?height=700&width=400"
                    title="Swiss Alps Adventure"
                    location="Zermatt, Switzerland"
                    category="Mountains"
                    saves="2.9k"
                  />
                </div>
              </TabsContent>
              <TabsContent value="list">
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="relative w-16 h-16 overflow-hidden rounded-lg">
                        <img
                          src={`/placeholder.svg?height=64&width=64&text=Pin${i}`}
                          alt={`Pin ${i}`}

                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Popular Destination #{i}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>Location #{i}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{Math.floor(Math.random() * 10000)}+ views</p>
                        <p className="text-sm text-emerald-600">{Math.floor(Math.random() * 1000)}+ saves</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ContainerWrapper>
  )
}